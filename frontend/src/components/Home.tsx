import Balancecard from "./BalanceCard"
import OptionsCard from "./OptionsCard"
import { useNavigate } from 'react-router-dom';
import Carousel from "./HomeCarousel";

function Home() {
    console.log("Home");
    if (!localStorage.getItem("token")) {
        const Navigate = useNavigate()
        Navigate('/login')
    }

    return (
        <div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div >
                    <Balancecard />
                    <OptionsCard />
                </div>
                <div className="flex justify-center p-4">
                    <Carousel />
                </div>
            </div>
        </div>
    )
}

export default Home