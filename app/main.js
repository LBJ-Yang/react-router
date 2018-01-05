import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
import {BrowserRouter,HashRouter, Route, NavLink, Switch, Link} from 'react-router-dom';
import './router.less';

/*import HelloMsg from './mod1/mod1.jsx';
import 'index.css';


ReactDOM.render(
    <HelloMsg />
    ,document.getElementById('root')
);
*/
const PageLayout = ()=> (
	<div>
		<HeaderLayout />
		<div className='mainDiv'>
			<Route path='/' exact component={Home} />
			<Route path='/schedule' component={Schedule} />
			<Route path='/player' component={Player} />
		</div>
	</div>
)

const HeaderLayout = () => (
	<div className='header'>
		<NavLink to='/' exact activeClassName="active" >首页</NavLink>
		<NavLink to='/schedule' activeClassName="active" >赛程</NavLink>
		<NavLink to='/player' activeClassName="active" >球员表</NavLink>
	</div>
)

const Home =() => (
	<h1>这里是首页</h1>
)

const Schedule = () => (
	<ul className="scheduleUl ul">
		<li>one</li>
		<li>two</li>
		<li>three</li>
		<li>four</li>
	</ul>
)

const playerName = ['lbj','kb','kg','dw'];

const Player = ({match}) => (
	<div>
		<TopHeader member = {playerName} />
		<div className="mainCont">
			<Switch>
				<Route path={match.path} exact render={() => <h1>这里是Player首页</h1> }/>
				<Route path={`${match.path}/:member`} component={PlayerProfile}/>
			</Switch>
		</div>
	</div>
)

const PlayerProfile = ({match}) => (
	<h1 userid = {match.params.member}>this is {match.params.member}'s Subpage page!</h1>
)

class TopHeader extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(event){
		console.log(event.target.innerText);
		console.log(location);
		location.href += `/${event.target.innerText}`;
	}
	render(){
		return(
			<div className="asideBar">
				<ul className="playerUl ul">
					{this.props.member.map((item,key)=>(
						// <p key = {key} onClick={this.handleClick}>{item}</p>
						<li key = {key}><Link to={`/player/${item}`}>{item}</Link></li>
					))}
				</ul>
			</div>
		)
	}
}

const App = () => (
	<HashRouter>
		<PageLayout />
	</HashRouter>
)

ReactDOM.render(<App />,document.getElementById('root'));