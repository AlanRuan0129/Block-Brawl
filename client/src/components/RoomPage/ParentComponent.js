import SettingPage from "./SettingPage";
import ChatRoom from "./ChatRoom";

function ParentComponent() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-3/4 overflow-y-auto bg-room bg-center bg-cover">
        <SettingPage />
      </div>
      <div className="w-1/4 overflow-y-auto">
        <ChatRoom />
      </div>
    </div>
  );
}
export default ParentComponent;
