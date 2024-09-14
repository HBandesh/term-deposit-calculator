import UpLogo from '../assets/up.svg';

export const Header = () => {
    return (
        <header className='header'>
            <img src={UpLogo} className="logo" alt="UP logo" />
        </header>
    )
}