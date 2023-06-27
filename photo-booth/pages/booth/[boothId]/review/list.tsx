import Image from 'next/image';
import styled from 'styled-components';

import ReviewComp from '@components/map/review';
import ArrowBack from '@image/arrow_back.png';
import { requestReviewApi } from '@repositories/booth/review';
import { useOnScreen } from '@utils/hook/useOnScreen';
import { Review, tagValue } from '@utils/interface/photoBooth';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function BoothReviewList() {
  const navigation = useRouter();

  const [curReviews, setCurReviews] = useState<Array<Review>>([
    {
      user: 'test name',
      date: undefined,
      content: '여기 사진 진짜 잘 나오네요. 만족스러운 시간이었습니다. 다음에도 꼭 가고싶어요...',
      score: 4.5,
      imgUrl: '',
      userTags: ['사진이 잘 나와요', '조명이 좋아요', '파우더룸이 잘 되어있어요'] as tagValue[],
    },
    {
      user: 'test name',
      date: undefined,
      content: '여기 사진 진짜 잘 나오네요. 만족스러운 시간이었습니다. 다음에도 꼭 가고싶어요...',
      score: 4.5,
      imgUrl: '',
      userTags: ['사진이 잘 나와요', '조명이 좋아요', '파우더룸이 잘 되어있어요'] as tagValue[],
    },
    {
      user: 'test name',
      date: undefined,
      content: '여기 사진 진짜 잘 나오네요. 만족스러운 시간이었습니다. 다음에도 꼭 가고싶어요...',
      score: 4.5,
      imgUrl: '',
      userTags: ['사진이 잘 나와요', '조명이 좋아요', '파우더룸이 잘 되어있어요'] as tagValue[],
    },
    {
      user: 'test name',
      date: undefined,
      content: '여기 사진 진짜 잘 나오네요. 만족스러운 시간이었습니다. 다음에도 꼭 가고싶어요...',
      score: 4.5,
      imgUrl: '',
      userTags: ['사진이 잘 나와요', '조명이 좋아요', '파우더룸이 잘 되어있어요'] as tagValue[],
    },
  ]);

  //무한 스크롤에 필요한 훅들
  const curPage = useRef<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const getReviews = async () => {
    setIsRequesting(true);
    try {
      console.log(navigation.query);
      const { review } = await requestReviewApi(Number(navigation.query.boothId), curPage.current);
      if (review.length === 0) {
        curPage.current = -1;
      } else {
        curPage.current += 10;
        setCurReviews([...curReviews, ...review]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (!navigation.query.boothId) return;

    if (isOnScreen && !isRequesting && curPage.current !== -1) {
      getReviews();
    }
  }, [curPage, navigation.query.boothId, isOnScreen, isRequesting]);

  return (
    <Wrapper>
      <AppBar>
        <Image
          src={ArrowBack}
          alt=""
          width="13"
          height="7"
          onClick={() => {
            navigation.back();
          }}
        />
        <p className="appbar_sentence">{'테스트 네임'}</p>
        <div className="blank"></div>
      </AppBar>
      <Body>
        {curReviews.map((review) => {
          return <ReviewComp name="" score={review.score} review={review} />;
        })}
        <LastLine ref={curPage.current === -1 ? null : elementRef}></LastLine>
      </Body>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  background-color: #242424;
  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

const AppBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 0 0 1;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  & > img {
    object-fit: contain;
  }

  & > .appbar_sentence {
    font-weight: 600;
    font-size: 18px;
  }

  & > div.blank {
    width: 13px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: scroll;
`;

const LastLine = styled.div`
  opacity: 0;
  width: 10px;
  height: 10px;
`;
