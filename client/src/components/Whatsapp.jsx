
import { SgvWhatsapp } from "../assets/svg"


export const Whatsapp = () => {
  
  return (
    <div className="whatsapp">
      <a href={`https://api.whatsapp.com/send?phone=5350889404&text=Hola`}>
        <SgvWhatsapp />
      </a>
    </div>
  )
}
