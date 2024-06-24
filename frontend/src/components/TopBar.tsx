import { Link } from 'react-router-dom';


function TopBar() {
    const token = localStorage.getItem('token');
    
    return (
        <div className='p-2 mt-1 flex justify-between border-b-2'>
            <div className='text-xl pl-2 font-bold'>
                <span>Your </span>
                <span className="bg-blue-800 text-white rounded p-2 " > Wallet </span>
            </div>
            <div className='text-xl pr-2 pt-0'>
                {token ? (
                    <button
                        className='text-base rounded border-2 p-1 mt-0'
                        onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>Sign Out</button>
                ) : (
                <div className='text-base rounded  p-1 mt-0'>
                    <Link className='rounded border-2 mr-1 p-1 px-2' to="/login">Login</Link>
                    <Link className='rounded border-2 ml-1 p-1 px-2' to="/register">Register</Link>
                </div>
                )}
            </div>
        </div>
    )
}

export default TopBar;