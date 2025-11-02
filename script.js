function showSection(sectionName) 
{
    document.getElementById('dashboard-section').classList.add('hidden');
    document.getElementById('reports-section').classList.add('hidden');
    document.getElementById('learn-section').classList.add('hidden');
    document.getElementById(sectionName + '-section').classList.remove('hidden');
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.closest('.nav-item').classList.add('active');
}
function openReportModal(category) 
{
    document.getElementById('reportModal').classList.add('active');
    if (category) 
    {
        document.getElementById('categorySelect').value = category;
    }
}
function closeReportModal() 
{
    document.getElementById('reportModal').classList.remove('active');
    document.getElementById('reportForm').reset();
    document.getElementById('imagePreview').classList.add('hidden');
}
function previewImage(event) 
{
    const file = event.target.files[0];
    if(file) 
    {
        const reader = new FileReader();
        reader.onload = function(e) 
        {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
}
function submitReport() 
{
    const category = document.getElementById('categorySelect').value;
    if (!category) {
        alert('Please select a category');
        return;
    }
    alert('Report submitted successfully! Municipality will respond within 24-48 hours.');
    closeReportModal();
}
document.addEventListener('DOMContentLoaded', function() 
{
    const modalOverlay = document.getElementById('reportModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeReportModal();
            }
        });
    }
});
