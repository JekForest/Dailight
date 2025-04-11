import React, { useEffect } from "react";
import { SwipeAction, Toast } from 'antd-mobile';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { queryStoreListAsync, removeStoreListById } from '../store/slices/storeSlice';
import NavBarAgain from '../components/NavBarAgain';
import NewsItem from '../components/NewsItem';
import SkeletonAgain from '../components/SkeletonAgain';
import api from "../api";

/* 样式 */
const StoreBox = styled.div`
    .box {
        padding:30px;
    }
`;

const Store = function Store() {
    const dispatch = useDispatch();
    const { list: storeList } = useSelector(state => state.store);

    useEffect(() => {
        // 第一次加载完毕:如果redux中没有收藏列表,则异步派发获取
        if (!storeList) dispatch(queryStoreListAsync());
    }, [storeList, dispatch]);

    // 移除收藏
    const handleRemove = async (id) => {
        try {
            let { code } = await api.storeRemove(id);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '移除失败'
                });
                return;
            }
            Toast.show({
                icon: 'success',
                content: '移除成功'
            });
            dispatch(removeStoreListById(id));
        } catch (_) { }
    };

    return <StoreBox>
        <NavBarAgain title="我的收藏" />
        {storeList ?
            <div className="box">
                {storeList.map(item => {
                    let { id, news } = item;
                    return <SwipeAction key={id} rightActions={[{
                        key: 'delete',
                        text: '删除',
                        color: 'danger',
                        onClick: handleRemove.bind(null, id)
                    }]}>
                        <NewsItem info={news} />
                    </SwipeAction>;
                })}
            </div> :
            <SkeletonAgain />
        }
    </StoreBox>;
};

export default Store;