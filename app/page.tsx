"use client";

import type React from "react";

import html2canvas from "html2canvas";
import {
  Chrome,
  Download,
  Minus,
  Plus,
  Settings2,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatWindow() {
  const [browserTitle, setBrowserTitle] = useState(
    "需要帮助? 尽管提问 - Google Chrome"
  );
  const [browserUrl, setBrowserUrl] = useState(
    "chatsupport.apple.com/WebAPI801/getCustomerInfo"
  );
  // 添加尺寸的状态
  const [size, setSize] = useState({ width: 400, height: 820 });
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 400, height: 820 });
  // 编辑浏览器标题和URL
  const handleBrowserTitleEdit = () => {
    const title = prompt("请输入浏览器标题", browserTitle);
    if (title) {
      setBrowserTitle(title);
    }
  };
  const handleBrowserUrlEdit = () => {
    const url = prompt("请输入URL", browserUrl);
    if (url) {
      setBrowserUrl(url);
    }
  };
  const [systemMessage, setSystemMessage] = useState({
    timestamp: "04/08/2025 9:14 AM",
    advisor: "Yue Ning Wang",
    caseNumber: "102570610048",
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "感谢你联系 Apple 支持，请稍等片刻，我需要查看一下你提供的信息。",
      isUser: false,
    },
    {
      id: 2,
      text: "洋世方千，庆幸相遇。您的专属 Apple 人工顾问已经听到您的召唤啦，请问有什么可以帮您呢~ 🎉",
      isUser: false,
      isTail: true,
    },
    {
      id: 3,
      text: "您好，麻烦查下兑品卡京东的时间，谢谢！XGZKFK7C4VGRNUR9XRFDC3NLR5Z7VWTJ",
      isUser: true,
      isTail: true,
    },
    {
      id: 4,
      text: "不客气哒，收到啦",
      isUser: false,
    },
    {
      id: 5,
      text: "正在查询啦，等我一下下就好啦",
      isUser: false,
    },

    {
      id: 7,
      text: "卡片兑换时间: 04/11/2025",
      isUser: false,
      isTail: true,
    },
    {
      id: 9,
      text: "好的，谢谢！",
      isUser: true,
      isTail: true,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleBubbleClick = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };
  const handleSystemMessageEdit = () => {
    const timestamp = prompt("请输入时间戳", systemMessage.timestamp);
    const advisor = prompt("请输入顾问姓名", systemMessage.advisor);
    const caseNumber = prompt("请输入案例编号", systemMessage.caseNumber);

    if (timestamp && advisor && caseNumber) {
      setSystemMessage({
        timestamp,
        advisor,
        caseNumber,
      });
    }
  };
  const handleEditSave = () => {
    if (editingId !== null) {
      setMessages(
        messages.map((msg) =>
          msg.id === editingId ? { ...msg, text: editText } : msg
        )
      );
      setEditingId(null);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
  };

  const handleDownload = async () => {
    if (chatWindowRef.current) {
      try {
        const canvas = await html2canvas(chatWindowRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "chat-screenshot.png";
        link.click();
      } catch (error) {
        console.error("Screenshot failed:", error);
      }
    }
  };

  // 添加调整大小的事件处理器
  const handleResizeStart = (e: any) => {
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width: size.width, height: size.height });
  };

  const handleMouseMove = (e: any) => {
    if (isResizing) {
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      setSize({
        width: Math.max(300, startSize.width + deltaX),
        height: Math.max(400, startSize.height + deltaY),
      });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // 添加全局事件监听
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex items-center justify-center p-2">
      <div
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
        className="relative bg-white rounded-lg shadow-lg"
      >
        <div ref={chatWindowRef} className="flex flex-col h-full">
          {/* 浏览器标题栏 */}
          <div className="bg-[#DEE6F9] flex items-center p-2 border-b border-gray-300">
            <div className="flex items-center  mr-auto">
              <Chrome className="h-4 w-4 text-gray-500 mr-2 " />
              <div
                className="flex-1 text-sm font-medium text-gray-800 cursor-pointer"
                onClick={handleBrowserTitleEdit}
              >
                {browserTitle}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-gray-600">
                <Minus className="h-4 w-4" />
              </button>
              <button className="text-gray-600">
                <Square className="h-3 w-3" />
              </button>
              <button className="text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="bg-gray-100">
            {/* 地址栏 */}
            <div className="bg-[rgb(237,242,250)] shadow  p-1 border-b border-gray-300 flex items-center">
              <div className="flex items-center mx-0.5 p-1 bg-white rounded-full">
                <Settings2 color="black" size={14} className="text-black" />
              </div>
              <div
                className="flex-1  rounded-md py-1 px-2 text-ellipsis overflow-hidden text-sm text-gray-700 cursor-pointer"
                onClick={handleBrowserUrlEdit}
              >
                {browserUrl}
              </div>
            </div>
            {/* Header */}
            <div className=" p-3 flex mt-1 pt-2 items-center justify-center relative border-b">
              <img src="/image.png" alt="Apple" className="h-6 w-6 mb-12" />
              <div className="absolute  absolute-center flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                <span className="text-xs  text-gray-600">
                  您已经与 Advisor（技术顾问）建立连接
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <button className="bg-gray-200 text-xs px-4 mb-2 py-1 rounded-sm text-blue-500">
                  结束聊天
                </button>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 text-sm p-3 px-8 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div
              className="mb-4 text-[#666666] cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              onClick={handleSystemMessageEdit}
            >
              <div className="mb-2">{systemMessage.timestamp}</div>
              <div>
                您正在与 {systemMessage.advisor} 聊天。您的案例编号是{" "}
                {systemMessage.caseNumber}。
              </div>
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {editingId === message.id ? (
                    <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-xs">
                      <textarea
                        value={editText}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                        rows={3}
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={handleEditCancel}
                          className="px-2 py-1 text-xs bg-gray-200 rounded"
                        >
                          取消
                        </button>
                        <button
                          onClick={handleEditSave}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                        >
                          保存
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {message.isTail && (
                        <img
                          src={
                            message.isUser
                              ? "/corn_right.svg"
                              : "/corn_left.svg"
                          }
                          alt="left corn"
                          className={
                            message.isUser
                              ? "absolute bottom-0  right-0 w-6 translate-x-[30%] translate-y-[-3%]"
                              : "absolute bottom-0  left-0 w-6 translate-x-[-30%] translate-y-[-3%]"
                          }
                        />
                      )}
                      <div
                        onClick={() =>
                          handleBubbleClick(message.id, message.text)
                        }
                        className={`px-3 py-2 rounded-xl relative  max-w-[250px] break-all cursor-pointer ${
                          message.isUser
                            ? "bg-[#0071e3] text-[#fff] "
                            : "bg-[#dedee3]  text-[#494949] "
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 relative z-10 p-3 flex items-center justify-between border-t">
            <span className=" bg-gray-400  text-white rounded-full w-6 h-6 flex items-center justify-center">
              <Plus color="#fff" className="h-4 w-4"></Plus>
            </span>
            <div className="flex-1 mx-2">
              <div className="h-9 bg-white border border-gray-100 relative rounded-full flex items-center justify-end px-3 ">
                <div className="absolute top-[50%] text-[15px] left-3  translate-y-[-50%]  text-[#a3a2a2]">
                  发送消息
                </div>
                <span className="bg-gray-300 text-white text-sm border-0 rounded-full w-6 h-6 flex items-center justify-center">
                  ↑
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="p-4 relative bg-gray-100 border-t flex justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            下载聊天截图
          </button>
          {/* 调整大小的手柄 */}
          <div
            className="absolute  text-gray-500  bottom-0 right-0 flex items-center px-2 py-1 rounded-sm text-xs select-none cursor-se-resize  hover:bg-blue-100"
            onMouseDown={handleResizeStart}
          >
            <span>长按我可调整大小</span>
          </div>
        </div>
      </div>
    </div>
  );
}
