document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';

        try {
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/5d0e35dcdae5f10160d90029b39c1c8b', {
                method: 'POST',
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });
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