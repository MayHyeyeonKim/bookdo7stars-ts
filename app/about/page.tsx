import React from 'react';
import Link from 'next/link';
function About() {
    return (
        <div>
            <h1>여기는 about 페이지 입니다.</h1>
            <Link href="/" passHref>
                홈으로 가기
            </Link>
        </div>
    );
}

export default About;
