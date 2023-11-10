// import { Outlet } from 'react-router-dom';
import { ProfileCompletion } from '../ProfileCompletion';

export function Layout() {
    return (
        <>
            {false ? (
                <ProfileCompletion />
            ) : (
                <div>
                    Layout
                    {/* <Outlet /> */}
                </div>
            )}
        </>
    );
}
