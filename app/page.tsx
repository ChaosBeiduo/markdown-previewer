"use client";

import {convertMarkdownToHTML} from './utils/markdown';
import {useState} from "react";

export default function Home() {
    const [markdown, setMarkdown] = useState(
 `# 欢迎使用 Markdown 实时预览

在左侧编辑你的 Markdown 文本，右侧将实时显示渲染后的内容。

## 示例

- 项目一
- 项目二
- 项目三`
    );

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

    return (
        <div className="w-full h-full bg-white shadow-lg box-border rounded-lg">
            <div className="flex gap-8 p-6 h-full">
                <div className="w-1/2 h-full">
                      <textarea
                          value={markdown}
                          onChange={handleChange}
                          className="w-full h-full p-4 border-2 border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="在这里输入 Markdown 文本"
                      />
                </div>

                {/* 预览区 */}
                <div className="w-1/2 overflow-y-auto p-4 bg-gray-50 border-2 border-gray-300 rounded-md h-full">
                    <div
                        className="prose prose-lg"
                        dangerouslySetInnerHTML={{__html: convertMarkdownToHTML(markdown)}}
                    />
                </div>
            </div>
        </div>
    );
}