import React from 'react'
import Avatar from '../avatar/Avatar'
import { AiOutlineHeart } from "react-icons/ai";
import "./Post.scss";
import backgroundImg from "../../assets/pexels-michael-block-3225517.jpg";


function Post() {
  return (
    <div className='Post'>
        <div className="heading">
            <Avatar/>
            <h4>Sahil Preet</h4>
        </div>
        <div className="content">
            <img src={backgroundImg} alt="" />
        </div>
        <div className="footer">
            <div className="like">
                <AiOutlineHeart className='icon'/>
                <h4>4 likes</h4>
            </div>
            <p className='caption'>I love the nature so  much. It heals people</p>
            <h6 className='time-ago'>4 hrs ago</h6>
        </div>
    </div>
  )
}

export default Post