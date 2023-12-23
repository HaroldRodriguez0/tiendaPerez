
import { SgvWhatsapp } from "../assets/svg"


export const Whatsapp = () => {
  
  return (
    <div className="whatsapp">
      <a href={`https://api.whatsapp.com/send?phone=5353760295&text=Hola%2C%20necesito%20un%20Taxi`}>
        <SgvWhatsapp />
      </a>
    </div>
  )
}
