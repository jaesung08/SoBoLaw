import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Avatar } from "antd";
import { getMessaging, onMessage } from "firebase/messaging";
import avatar from "/images/soboro_color.png";

const Notification = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    title: string;
    body: string;
  }>({ title: "", body: "" });

  useEffect(() => {
    // Firebase messaging 객체 생성
    const messaging = getMessaging();
    // 알림 메시지 수신 시 실행될 콜백 등록
    onMessage(messaging, (payload) => {
      console.log(payload);
      // 수신한 알림을 상태에 저장
      setNotification({
        title: payload.notification?.title || "",
        body: payload.notification?.body || "",
      });
    });
  }, []);

  useEffect(() => {
    // 알림 상태가 변경될 때마다 알림을 표시
    if (notification.title || notification.body) {
      notify();
    }
  }, [notification]);

  // react-hot-toast를 사용하여 알림을 표시하는 함수
  const notify = () =>
    toast.custom(() => (
      <div
        style={{
          maxWidth: "calc(100vw - 2rem)",
          width: "50%",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "3rem",
          borderRadius: "8px",
          pointerEvents: "auto",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
        }}
      >
        <div style={{ flex: "1", width: "0", padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "0.5rem", paddingTop: "0.125rem" }}>
              <Avatar size={40} src={avatar} />
            </div>
            <div style={{ flex: "1" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {notification.title}
              </p>
              <p
                style={{ fontSize: "0.875rem", color: "#6B7280" }}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                {notification.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));

  return <Toaster position="top-right" />;
};

export default Notification;
