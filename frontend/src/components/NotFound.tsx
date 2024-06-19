import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate= useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        404 - Page Not Found
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        The page you are looking for does not exist.
      </p>
    </div>
    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
      <div className="rounded-md shadow">
        <button onClick={()=>{
            navigate('/');
        }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
          Go back to home
        </button>
      </div>
    </div>
  </div>
</div>
    );
}
export default NotFound;