document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json').then(r => r.json()).then(data => {
        // توزيع فيديوهات اليوتيوب في الرئيسية
        const ytGrid = document.getElementById('youtube-grid');
        if(ytGrid) data.youtubeVideos.forEach(v => ytGrid.innerHTML += card(v.id, v.title_en, v.title_ar, 'yt'));

        // توزيع فيديوهات المونتاج في صفحة المونتاج
        const editGrid = document.getElementById('editing-grid');
        if(editGrid) data.editingVideos.forEach(v => editGrid.innerHTML += card(v.file, v.title_en, v.title_ar, 'local'));

        // توزيع فيديوهات AI في صفحة الـ AI
        const aiGrid = document.getElementById('ai-grid');
        if(aiGrid) data.aiVideos.forEach(v => aiGrid.innerHTML += card(v.file, v.title_en, v.title_ar, 'local'));
    });
});

function card(media, en, ar, type) {
    let content = type === 'yt' ? 
        `<iframe src="https://www.youtube.com/embed/${media}" frameborder="0" allowfullscreen></iframe>` : 
        `<video controls src="${type === 'yt' ? '' : (media.includes('ai') ? 'ai_videos/' : 'videos/')}${media}"></video>`;
    
    return `<div class="card-hover sfx-hover" data-aos="fade-up">
        <div class="${type === 'yt' ? 'video-container' : 'video-container-vertical'}">${content}</div>
        <div class="card-body"><h3 class="lang-en">${en}</h3><h3 class="lang-ar d-none">${ar}</h3></div>
    </div>`;
}