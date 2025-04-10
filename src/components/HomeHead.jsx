import { useMemo, useEffect } from "react";
import timg from '../assets/images/timg.jpg';
import './HomeHead.less';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryUserInfoAsync } from '../store/reducer/base';

const HomeHead = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const today = useSelector(state => state.base.today);
    const info = useSelector(state => state.base.info);

    let time = useMemo(() => {
        let [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
            area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            month: area[+month] + '月',
            day
        };
    }, [today]);

    useEffect(() => {
        if (!info) {
            dispatch(queryUserInfoAsync());
        }
    }, [info, dispatch]);

    return <header className="home-head-box">
        <div className="info">
            <div className="time">
                <span>{time.day}</span>
                <span>{time.month}</span>
            </div>
            <h2 className="title">知乎日报</h2>
        </div>

        <div className="picture"
            onClick={() => {
                navigate('/personal');
            }}>
            <img src={info ? info.pic : timg} alt="" />
        </div>
    </header>;
};

export default HomeHead;
