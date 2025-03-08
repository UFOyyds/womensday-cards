document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cardTitleInput = document.getElementById('cardTitle');
    const avatarUpload = document.getElementById('avatarUpload');
    const resetAvatar = document.getElementById('resetAvatar');
    const messageTextarea = document.getElementById('message');
    const senderInput = document.getElementById('sender');
    const themeItems = document.querySelectorAll('.theme-item');
    const downloadBtn = document.getElementById('downloadCard');
    
    // 预览元素
    const cardPreview = document.getElementById('cardPreview');
    const previewAvatar = document.getElementById('previewAvatar');
    const previewTitle = document.getElementById('previewTitle');
    const previewMessage = document.getElementById('previewMessage');
    const previewSender = document.getElementById('previewSender');
    
    // 默认头像路径
    const defaultAvatar = 'assets/cat.jpg';
    
    // 当前选择的主题
    let currentTheme = 'spring';
    
    // 各主题对应的祝福语
    const themeMessages = {
        spring: "春风送暖，愿您如春日花朵般绽放光彩，女神节快乐！",
        art: "用艺术的眼光看世界，用独特的方式绽放自我，女神节快乐！",
        ocean: "如大海般深邃，如波浪般自由，愿您的生活充满神秘与活力，女神节快乐！",
        warm: "温暖如阳光，柔和似春风，愿幸福与爱围绕着您，女神节快乐！",
        tech: "智慧如你，未来可期，愿科技让生活更美好，女神节快乐！",
        vintage: "如古典音乐般优雅，如复古画卷般美丽，女神节快乐！",
        shine: "愿你如星光般闪耀，照亮自己也温暖他人，女神节快乐！",
        forest: "如森林般充满生机，如绿叶般坚韧顽强，女神节快乐！",
        gradient: "生活如梦幻渐变，愿每一天都是新的色彩，女神节快乐！",
        elegant: "优雅如你，不必多言，气质自在举手投足间，女神节快乐！",
        sunset: "如晚霞般绚烂多彩，愿生活中的每个瞬间都如此美丽，女神节快乐！",
        lavender: "芬芳如薰衣草，宁静而美好，愿您的生活充满温柔与静谧，女神节快乐！"
    };
    
    // 实时更新预览
    function updatePreview() {
        previewTitle.textContent = cardTitleInput.value ? `致：${cardTitleInput.value}` : '致：亲爱的朋友';
        previewMessage.textContent = messageTextarea.value || '祝福语会显示在这里';
        previewSender.textContent = senderInput.value || '署名';
    }
    
    // 切换主题
    function changeTheme(theme, color) {
        currentTheme = theme;
        cardPreview.style.backgroundColor = color;
        
        // 移除所有主题项的active类
        themeItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 给当前选中的主题添加active类
        event.currentTarget.classList.add('active');
        
        // 设置对应的祝福语
        messageTextarea.value = themeMessages[theme];
        previewMessage.textContent = themeMessages[theme];
    }
    
    // 上传头像
    avatarUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatarPreview').style.backgroundImage = `url(${e.target.result})`;
                previewAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 重置头像
    resetAvatar.addEventListener('click', function() {
        document.getElementById('avatarPreview').style.backgroundImage = `url(${defaultAvatar})`;
        previewAvatar.src = defaultAvatar;
    });
    
    // 表单输入事件
    cardTitleInput.addEventListener('input', updatePreview);
    messageTextarea.addEventListener('input', updatePreview);
    senderInput.addEventListener('input', updatePreview);
    
    // 主题选择
    themeItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const theme = this.dataset.theme;
            const color = this.dataset.color;
            changeTheme(theme, color);
        });
    });
    
    // 设置默认主题
    document.querySelector('.theme-item[data-theme="spring"]').classList.add('active');
    cardPreview.style.backgroundColor = '#8BC34A';
    
    // 下载卡片
    downloadBtn.addEventListener('click', function() {
        // 使用html2canvas将卡片转换为图片
        html2canvas(cardPreview).then(canvas => {
            // 创建下载链接
            const link = document.createElement('a');
            link.download = '女神节祝福卡.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
    
    // 页面加载时设置默认祝福语
    messageTextarea.value = themeMessages[currentTheme];
    
    // 初始化预览
    updatePreview();
});
