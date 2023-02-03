import { useEffect } from "react";
import style from './GameDetail.module.css'
import { connect } from 'react-redux'
import { getGameDetail } from "../../redux/actions";
import { Route } from "react-router-dom";


const GameDetail = (props) => {
    const id = props.match.location.pathname.split('/',3)[2];
    useEffect(()=>{
        props.getGameDetail(id)
    },[id, props])

    return(
        <div className={style.all}>
             <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push('/home') }}>Back 🏠</button>)}/>
            <div className={style.container}>
                <h4 className={style.titles}>{props.gameDetail.name}</h4>
                <center><img className={style.img} src={props.gameDetail.image} alt={props.gameDetail.name}></img></center>
                <div className={style.minicontainer}>
                    <p>📅 Released: {props.gameDetail.released}</p>
                    <p>⭐ Rating: {props.gameDetail.rating}</p>
                </div>
                <div className={style.minicontainer}>
                    <ul className={style.list}>
                        <h4>Genres:</h4>
                        {props.gameDetail.genres?.map(g => <li key={g.name}>{g.name}</li>)}
                    </ul>  
                </div> 
                <div className={style.minicontainer}>
                    <ul className={style.list}>
                        <h4>Platforms:</h4>
                        {props.gameDetail.platforms?.map(p => <li key={typeof p === 'string' ? p : p.platform.name}>{typeof p === 'string' ? p : p.platform.name}</li>)}
                    </ul> 
                </div> 
                <div className={style.description}>
                    <p className={style.text}>
                        <h4>Description:</h4>
                        {props.gameDetail.description?.replace(/<[^>]+>/g, '')}
                    </p>
                </div>
            </div>
            <Route render={({history}) => (<button className={style.btn} onClick={() => { history.push('/home') }}>Back 🏠</button>)}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
        gameDetail: state.gameDetail
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        getGameDetail:(id) => dispatch(getGameDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);