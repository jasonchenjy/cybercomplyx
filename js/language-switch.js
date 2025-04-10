document.addEventListener('DOMContentLoaded', function() {
    const languageSwitch = document.querySelector('.language-switch');
    
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取当前页面路径
            const currentPath = window.location.pathname;
            
            // 判断当前是否在英文目录
            const isEnglish = currentPath.includes('/en/');
            
            // 构建目标URL
            let targetPath;
            if (isEnglish) {
                // 如果当前是英文，切换到中文
                targetPath = currentPath.replace('/en/', '/');
            } else {
                // 如果当前是中文，切换到英文
                targetPath = currentPath.replace('/cybercomplyx/', '/cybercomplyx/en/');
            }
            
            // 跳转到目标页面
            window.location.href = targetPath;
        });
    }
});