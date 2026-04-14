import { sys } from 'cc';

/**
 * 微信小游戏平台兼容工具。
 * 在非微信平台上所有方法都安全降级。
 */
export class WechatCompat {

  static isWechat(): boolean {
    return sys.platform === sys.Platform.WECHAT_GAME;
  }

  /**
   * 展示微信分享菜单（右上角"分享给朋友"）。
   * 在非微信环境下静默跳过。
   */
  static showShareMenu(): void {
    if (!WechatCompat.isWechat()) return;
    try {
      const wx = (globalThis as any).wx;
      if (!wx) return;
      wx.showShareMenu?.({
        withShareTicket: false,
        menus: ['shareAppMessage', 'shareTimeline']
      });
      wx.onShareAppMessage?.(() => ({
        title: '猫猫消消乐 - 来和可爱猫咪一起消除吧！',
        imageUrl: ''
      }));
    } catch (e) {
      console.warn('WechatCompat.showShareMenu failed:', e);
    }
  }

  /**
   * 微信小游戏登录。
   * 返回 code 或空字符串（非微信平台/失败时）。
   */
  static login(): Promise<string> {
    if (!WechatCompat.isWechat()) return Promise.resolve('');
    return new Promise((resolve) => {
      try {
        const wx = (globalThis as any).wx;
        if (!wx) { resolve(''); return; }
        wx.login({
          success: (res: any) => resolve(res?.code || ''),
          fail: () => resolve('')
        });
      } catch {
        resolve('');
      }
    });
  }

  /**
   * 显示微信激励视频广告（预留接口）。
   * adUnitId 需要在微信后台申请后填入。
   */
  static showRewardedAd(adUnitId: string): Promise<boolean> {
    if (!WechatCompat.isWechat()) return Promise.resolve(false);
    return new Promise((resolve) => {
      try {
        const wx = (globalThis as any).wx;
        if (!wx || !wx.createRewardedVideoAd) { resolve(false); return; }
        const ad = wx.createRewardedVideoAd({ adUnitId });
        ad.onClose((res: any) => {
          resolve(res && res.isEnded);
        });
        ad.onError(() => resolve(false));
        ad.load().then(() => ad.show()).catch(() => resolve(false));
      } catch {
        resolve(false);
      }
    });
  }

  /**
   * 显示 Banner 广告（预留接口）。
   */
  static showBannerAd(adUnitId: string): void {
    if (!WechatCompat.isWechat()) return;
    try {
      const wx = (globalThis as any).wx;
      if (!wx || !wx.createBannerAd) return;
      const { windowWidth, windowHeight } = wx.getSystemInfoSync();
      const bannerAd = wx.createBannerAd({
        adUnitId,
        style: {
          left: 0,
          top: windowHeight - 100,
          width: windowWidth
        }
      });
      bannerAd.onResize((size: any) => {
        bannerAd.style.top = windowHeight - size.height;
        bannerAd.style.left = (windowWidth - size.width) / 2;
      });
      bannerAd.show().catch(() => { /* ignore */ });
    } catch {
      // silent
    }
  }

  /**
   * 微信震动反馈（消除成功时调用）。
   */
  static vibrateShort(): void {
    if (!WechatCompat.isWechat()) return;
    try {
      const wx = (globalThis as any).wx;
      wx?.vibrateShort?.({ type: 'light' });
    } catch {
      // silent
    }
  }

  /**
   * 适配微信小游戏 localStorage（Cocos 的 sys.localStorage 已做兼容，此方法仅做安全检查）。
   */
  static safeGetItem(key: string): string | null {
    try {
      return sys.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  static safeSetItem(key: string, value: string): void {
    try {
      sys.localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage setItem failed:', key, e);
    }
  }
}
