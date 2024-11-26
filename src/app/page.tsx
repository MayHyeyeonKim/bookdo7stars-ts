'use client';
// import './styles/styles.css';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooksRequest } from './actions/types';
import { RootState } from '../app/reducers';
import { AppDispatch } from '../app/store/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = [
    { id: 50919, name: '영미소설' },
    { id: 161753, name: '글씨 쓰기' },
    { id: 161775, name: '글씨 쓰기 (한 카테고리에 category_id가 여러개일 수 있구나)' },
  ];
  //카테고리 ID를 처리하는 함수
  const handleButtonClick = (categoryId: number) => {
    console.log(`Clicked Category ID: ${categoryId}`);
    const action = getAllBooksRequest(1, 10, categoryId);
    console.log('Dispatching action=====>>>>', action);
    dispatch(action);
  };

  return (
    <div className="bg-green-200">
      <h1 className="text-xl text-white">Welcome to BookDo7Stars!!!!!!</h1>
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {categories.map((category) => (
          <button key={category.id} style={{ fontSize: '20px', margin: '20px' }} onClick={() => handleButtonClick(category.id)}>
            {category.name} (ID: {category.id})
          </button>
        ))}
      </section>
    </div>
  );
}
