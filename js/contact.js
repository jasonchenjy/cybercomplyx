document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';

        try {
            const formData = new FormData(form);
            const templateParams = {
                to_email: 'contact@cybercomply.com',
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                phone: formData.get('phone') || '未提供'
            };

            // 使用 EmailJS 发送邮件
            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                templateParams
            );

            alert('消息已发送，我们会尽快回复您！');
            form.reset();
            
        } catch (error) {
            console.error('发送失败:', error);
            alert('抱歉，发送失败，请稍后重试或直接联系我们。');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '发送消息';
        }
    });
});