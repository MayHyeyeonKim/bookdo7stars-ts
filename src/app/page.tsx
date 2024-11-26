'use client';
// import './styles/styles.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { getAllBooksRequest } from './actions/types';
import { AppDispatch } from '../app/store/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const categories = [
    { id: 50919, name: '영미소설' },
    { id: 161753, name: '글씨 쓰기' },
    { id: 161775, name: '글씨 쓰기 (한 카테고리에 category_id가 여러개일 수 있구나)' },
  ];

  const handleButtonClick = (categoryId: number) => {
    console.log(`Clicked Category ID: ${categoryId}`);
    const searchCondition = {
      category_id: categoryId,
      page: 1,
      pageSize: 10,
    };
    const action = getAllBooksRequest(1, 10, categoryId);
    console.log('Dispatching action=====>>>>', action);
    dispatch(action);

    // 결과 페이지로 이동
    const encodedSearchCondition = encodeURIComponent(JSON.stringify(searchCondition));
    router.push(`/search/result?searchCondition=${encodedSearchCondition}`);
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
