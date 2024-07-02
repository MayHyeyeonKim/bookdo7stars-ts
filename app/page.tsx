import React from 'react';
import Link from 'next/link';
function Home() {
    return (
        <div>
            <h1>북두칠성 홈페이지에 오신걸 환영합니다!</h1>
            <Link href="/about" passHref>
                어바웃 페이지
            </Link>
        </div>
    );
}

export default Home;
