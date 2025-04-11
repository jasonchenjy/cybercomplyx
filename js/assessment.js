document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('assessmentForm');
    
    // 处理"无认证"选项
    const noCertCheckbox = form.querySelector('input[value="none"]');
    const otherCertCheckboxes = form.querySelectorAll('input[name="currentCert"]:not([value="none"])');
    
    noCertCheckbox.addEventListener('change', function() {
        if (this.checked) {
            otherCertCheckboxes.forEach(cb => {
                cb.checked = false;
                cb.disabled = true;
            });
        } else {
            otherCertCheckboxes.forEach(cb => {
                cb.disabled = false;
            });
        }
    });

    otherCertCheckboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            if (this.checked) {
                noCertCheckbox.checked = false;
            }
        });
    });

    // 表单提交处理
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        try {
            // 这里添加表单数据提交到后端的逻辑
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/5d0e35dcdae5f10160d90029b39c1c8b', {
                method: 'POST',
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                form.reset();
                // 发送自动回复邮件
                // await sendAutoReply(formData.get('email'));
                
                // 跳转到感谢页面
                alert("提交成功！我们将尽快联系您。");
            } else {
                alert("提交失败，请稍后再试。");
            }
        } catch (error) {
            alert('抱歉，提交失败，请稍后重试或直接联系我们。');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = '提交评估';
        }
    });
});

// 自动回复邮件函数
async function sendAutoReply(email) {
    try {
        await fetch('/api/send-auto-reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    } catch (error) {
        console.error('发送自动回复邮件失败:', error);
    }
}