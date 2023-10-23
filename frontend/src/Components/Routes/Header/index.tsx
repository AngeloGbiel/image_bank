import styled from 'styled-components';
import Logo from '../../../assets/logo.png'
import Search from '../../../assets/search.png'

const HeaderStyled = styled.div`
    
`
const Header = () => {
    return(
        <HeaderStyled>
            <div className='left'>
                <img src={Logo} alt="Logo" />
                <div>
                    <div className='home'><p>Pagina inicial</p></div>
                    <div className='create'><p>Criar</p></div>
                </div>
            </div>
            <div className='search'>
                <input id='search' type="text" />
                <label htmlFor="search">
                    <img src={Search} alt="" />
                </label>
            </div>
            <div className='right'>
                <div className='login'><p>Login</p></div>
                <div className='register'><p>Register</p></div>
            </div>
        </HeaderStyled>
    )
}

export default Header;