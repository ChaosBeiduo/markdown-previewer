// utils/markdown.js

export function convertMarkdownToHTML(markdown) {
    let html = markdown;

    // 转换标题
    html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 转换加粗
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/__(.*)__/gim, '<strong>$1</strong>');

    // 转换斜体
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    html = html.replace(/_(.*)_/gim, '<em>$1</em>');

    // 转换删除线
    html = html.replace(/~~(.*)~~/gim, '<del>$1</del>');

    // 转换链接
    html = html.replace(/\[([^\[]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // 转换图片
    html = html.replace(/\!\[([^\[]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" />');

    // 转换有序列表
    html = html.replace(/^\d+\.\s+(.*)/gim, '<ol><li>$1</li></ol>');
    html = html.replace(/<\/ol>\s*<ol>/gim, '');

    // 转换无序列表
    html = html.replace(/^\*\s+(.*)/gim, '<ul><li>$1</li></ul>');
    html = html.replace(/<\/ul>\s*<ul>/gim, '');

    // 转换代码块
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/gim, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${escapeHTML(code)}</code></pre>`;
    });

    // 转换行内代码
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // 转换段落
    html = html.replace(/\n$/gim, '<br />');

    return html.trim();
}

function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
