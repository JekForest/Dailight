import React from "react";
import { Link } from 'react-router-dom';
import { RightOutline } from 'antd-mobile-icons';
import styled from "styled-components";
import NavBarAgain from '../components/NavBarAgain';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserInfo } from '../store/slices/baseSlice';
import { clearStoreList } from '../store/slices/storeSlice';
import _ from '../assets/utils';
import { Toast } from 'antd-mobile';

/* 样式 */
const PersonalBox = styled.div`
    .baseInfo {
        box-sizing: border-box;
        margin: 40px 0;
        .pic {
            display: block;
            margin: 0 auto;
            width: 172px;
            height: 172px;
            border-radius: 50%;
        }
        .name {
            line-height: 100px;
            font-size: 36px;
            text-align: center;
            color: #000;
        }
    }
    .tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #000;
        border-bottom: 2px solid #EEE;
    }
`;

const Personal = function Personal(props) {
    let { navigate } = props;
    const dispatch = useDispatch();
    const info = useSelector(state => state.base.info);

    // 退出登录
    const signout = () => {
        // 清除redux中的信息
        dispatch(clearUserInfo());
        dispatch(clearStoreList());
        // 清除Token
        _.storage.remove('tk');
        // 提示
        Toast.show({
            icon: 'success',
            content: '您已安全退出'
        });
        // 跳转
        navigate('/login?to=/personal', { replace: true });
    };
    return <PersonalBox>
        <NavBarAgain title="个人中心" />
        <div className="baseInfo">
            <Link to='/update'>
                <img className="pic" src={info?.pic || ''} alt="" />
                <p className="name">{info?.name || ''}</p>
            </Link>
        </div>
        <div>
            <Link to='/store' className="tab">
                我的收藏
                <RightOutline />
            </Link>
            <div className="tab" onClick={signout}>
                退出登录
                <RightOutline />
            </div>
        </div>
    </PersonalBox>;
};

export default Personal;