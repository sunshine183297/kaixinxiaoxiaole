import { _decorator, Component, ProgressBar, Button, AudioClip, director, AudioSource, Sprite, Node, Label, Canvas, UITransform, Widget, Color } from 'cc';
import { LevelSelectController } from './LevelSelectController';
import { APP_DISPLAY_NAME, UI_TEXT } from '../Utils/TextConst';
import { WechatCompat } from '../Utils/WechatCompat';
const { ccclass, property } = _decorator;

@ccclass('LoginController')
export class LoginController extends Component {
    @property(ProgressBar)
    public loadingBar: ProgressBar | null = null;
    
    @property(Button)
    public loginButton: Button | null = null;
    
    @property(AudioClip)
    public worldSceneBGM: AudioClip | null = null;
    
    private audioSource: AudioSource | null = null;

    onLoad(): void {
        if (typeof document !== 'undefined') {
            document.title = APP_DISPLAY_NAME;
        }
        WechatCompat.showShareMenu();
        this.ensureThemeTitle();
        // In Cocos 3.x, create AudioSource component to play audio
        this.audioSource = this.node.addComponent(AudioSource);
        if (this.audioSource && this.worldSceneBGM) {
            this.audioSource.clip = this.worldSceneBGM;
            this.audioSource.loop = true;
            this.audioSource.playOnAwake = true;
            this.audioSource.play();
        }

        this.ensureProgressBarSpriteType();
    }

    onLogin(): void {
        if (!this.loadingBar || !this.loginButton) return;
        
        this.loadingBar.node.active = true;
        this.loginButton.node.active = false;
        
        this.ensureProgressBarSpriteType();

        const barSprite = this.loadingBar.getComponentInChildren(Sprite);
        if (barSprite && barSprite.type === Sprite.Type.FILLED) {
            barSprite.fillRange = 0;
        }

        this.loadingBar.progress = 0;
        
        // Preload the Level scene with progress tracking
        director.preloadScene("Level", (completedCount: number, totalCount: number, item: any) => {
            if (!this.loadingBar) return;
            
            let progress = completedCount / totalCount;
            this.loadingBar.progress = progress;
            
            const barSprite = this.loadingBar.getComponentInChildren(Sprite);
            if (barSprite && barSprite.type === Sprite.Type.FILLED && progress > barSprite.fillRange) {
                barSprite.fillRange = progress;
            }
        }, (error: Error | null) => {
            if (error) {
                console.error('Failed to preload scene:', error);
                return;
            }
            
            if (this.loadingBar && this.loginButton) {
                this.loadingBar.node.active = false;
                this.loginButton.node.active = false;
            }
            
            director.loadScene("Level", () => {
                const scene = director.getScene();
                if (!scene) return;
                let rootNode = scene.getChildByName('LevelRoot');
                if (!rootNode) {
                    rootNode = new Node('LevelRoot');
                    scene.addChild(rootNode);
                }
                if (!rootNode.getComponent(LevelSelectController)) {
                    rootNode.addComponent(LevelSelectController);
                }
            });
        });
    }

    onDestroy(): void {
        if (this.audioSource) {
            this.audioSource.stop();
        }
    }

    private ensureProgressBarSpriteType(): void {
        if (!this.loadingBar) return;
        const barSprite = this.loadingBar.getComponentInChildren(Sprite);
        if (!barSprite) return;
        if (this.loadingBar.mode === ProgressBar.Mode.FILLED) {
            barSprite.type = Sprite.Type.FILLED;
        } else {
            barSprite.type = Sprite.Type.SIMPLE;
        }
    }

    private ensureThemeTitle(): void {
        const scene = director.getScene();
        if (!scene) return;
        const canvas = scene.getComponentInChildren(Canvas);
        if (!canvas) return;
        const canvasNode = canvas.node;
        if (canvasNode.getChildByName('ThemeTitle')) return;

        const titleNode = new Node('ThemeTitle');
        canvasNode.addChild(titleNode);
        const ui = titleNode.addComponent(UITransform);
        ui.setContentSize(520, 80);
        const widget = titleNode.addComponent(Widget);
        widget.isAlignTop = true;
        widget.isAlignHorizontalCenter = true;
        widget.top = 72;
        widget.horizontalCenter = 0;
        widget.target = canvasNode;

        const label = titleNode.addComponent(Label);
        label.string = UI_TEXT.login.heroTitle;
        label.fontSize = 34;
        label.color = new Color(255, 246, 196, 255);

        const subtitleNode = new Node('ThemeSubtitle');
        canvasNode.addChild(subtitleNode);
        const subtitleUi = subtitleNode.addComponent(UITransform);
        subtitleUi.setContentSize(520, 40);
        const subtitleWidget = subtitleNode.addComponent(Widget);
        subtitleWidget.isAlignTop = true;
        subtitleWidget.isAlignHorizontalCenter = true;
        subtitleWidget.top = 112;
        subtitleWidget.horizontalCenter = 0;
        subtitleWidget.target = canvasNode;
        const subtitle = subtitleNode.addComponent(Label);
        subtitle.string = UI_TEXT.login.heroSubtitle;
        subtitle.fontSize = 20;
        subtitle.color = new Color(220, 255, 220, 255);
    }

}
