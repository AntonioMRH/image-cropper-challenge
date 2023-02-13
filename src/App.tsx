import AvatarUpload from "./components/AvatarUpload"
import CropperCtxProvider from "./context/CropperCtx"
function App() {

  return (
    <CropperCtxProvider>
      <AvatarUpload />
    </CropperCtxProvider>
  )
}

export default App
