import BasicButton from '@components/common/button/BasicButton';
import { RegisterPhotoBoxStyle, RegisteredPhotoBoxStyle } from '@styles/review/reviewStyle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BoothReviewCreatePage = () => {
  const router = useRouter();
  const [page, setPage] = useState(2);
  const [starRate, setStarRate] = useState(0);
  const [tags, setTags] = useState([]);
  const [photos, setphotos] = useState([]);

  return (
    <div className={`flex flex-col justify-between w-full h-full text-[#F2F2F2] `}>
      <div className={`flex flex-col justify-between`}>
        <div className={`flex items-center justify-between p-4`}>
          <div
            className={`cursor-pointer`}
            onClick={() => {
              router.push('/sdfwerfwefwefwef e');
            }}
          >
            <Image src={`/common/close.svg`} width={25} height={25} alt="리뷰 닫기 버튼" />
          </div>
          <div className={`font-semibold`}>리뷰쓰기</div>
          <div></div>
        </div>

        {page === 1 ? (
          <>
            <div className={`flex flex-col bg-blue-700 justify-center items-center p-4 gap-4`}>
              <div className={`font-semibold`}>~~~점 어떠셨나요?</div>
              <div>별5</div>
            </div>
            <div className={`flex flex-col`}>
              <div className={`flex flex-col p-4 bg-yellow-700`}>
                <div className={`font-semibold`}>어떤 점이 좋았나요?</div>
                <div className={`font-semibold text-xs`}>(해당하는 태그 1~4개를 선택해주세요)</div>
              </div>
              <div></div>
            </div>
          </>
        ) : (
          <>
            <div className={`flex flex-col p-4 gap-4`}>
              <div className={`font-semibold text-sm`}>사진을 올려주세요</div>
              <div className={`flex gap-4 `}>
                <RegisterPhotoBoxStyle>
                  <div className="delete-button">
                    <Image
                      src={`/common/photo-icon.svg`}
                      width={30}
                      height={30}
                      alt="사진 등록 버튼"
                    />
                  </div>
                  <div className={`font-semibold text-sm`}>{photos.length}/3</div>
                </RegisterPhotoBoxStyle>
                <RegisteredPhotoBoxStyle>
                  <div className="delete-button cursor-pointer">
                    <Image src={`/common/close.svg`} width={15} height={15} alt="사진 삭제 버튼" />
                  </div>
                </RegisteredPhotoBoxStyle>
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </>
        )}
      </div>

      <div className={`w-full m-4 flex justify-center text-black`}>
        <BasicButton
          text={page === 1 ? '다음' : '리뷰 등록'}
          color={
            starRate >= 0 && starRate <= 5 && tags.length > 0 && tags.length <= 4
              ? 'darkYellow'
              : 'white'
          }
          size={'xLarge'}
          onClickEvent={() => {
            if (page === 1) setPage(2);
          }}
        />
      </div>
    </div>
  );
};

export default BoothReviewCreatePage;
