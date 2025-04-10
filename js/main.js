document.addEventListener('DOMContentLoaded', function() {
    // 初始化路由
    const router = new Router(['home', 'services', 'process', 'assessment', 'about', 'contact']);
    
    // 表单提交处理
    const form = document.getElementById('assessment-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 添加提交反馈
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading-spinner"></span> 提交中...';

            // 模拟提交过程
            setTimeout(() => {
                submitButton.innerHTML = '<span class="success-icon">✓</span> 提交成功！';
                
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '感谢您的提交！我们的团队会在24小时内与您联系。';
                form.appendChild(successMessage);

                // 重置表单状态
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '提交评估';
                    successMessage.remove();
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }

    // 语言切换
    const langSwitch = document.querySelector('.language-switch');
    if (langSwitch) {
        langSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            // 这里添加语言切换逻辑
            this.textContent = this.textContent === 'EN' ? 'CN' : 'EN';
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 服务页面标签切换
    document.addEventListener('DOMContentLoaded', function() {
        const tabLinks = document.querySelectorAll('.tab-link');
        const serviceSections = document.querySelectorAll('.service-section');
    
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有活动状态
                tabLinks.forEach(tab => tab.classList.remove('active'));
                serviceSections.forEach(section => section.classList.remove('active'));
                
                // 添加新的活动状态
                link.classList.add('active');
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).classList.add('active');
            });
        });
    });
    
    // 评估页面导航切换
    document.addEventListener('DOMContentLoaded', function() {
        const assessmentLinks = document.querySelectorAll('.service-nav-links a');
        const assessmentSections = document.querySelectorAll('.assessment-section');
    
        assessmentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有活动状态
                assessmentLinks.forEach(l => l.classList.remove('active'));
                assessmentSections.forEach(section => section.classList.remove('active'));
                
                // 添加新的活动状态
                link.classList.add('active');
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).classList.add('active');
            });
        });
    });
});