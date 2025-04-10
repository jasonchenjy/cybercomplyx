document.addEventListener('DOMContentLoaded', function() {
    // 服务导航切换功能
    const serviceLinks = document.querySelectorAll('.service-nav-links a');
    const serviceSections = document.querySelectorAll('.service-section');

    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 移除所有活动状态
            serviceLinks.forEach(l => l.classList.remove('active'));
            serviceSections.forEach(s => s.classList.remove('active'));
            
            // 添加新的活动状态
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

        });
    });
});