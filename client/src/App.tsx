import './App.scss';
import AllRoutes from './Routes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <AllRoutes />
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000
                }}
            />
        </>
    );
}

export default App;
