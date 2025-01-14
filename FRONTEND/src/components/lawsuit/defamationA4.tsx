import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import { RootState } from "../../redux/store/store";
import style from "../../styles/papers/A4.module.css";

export default function DefamatinoA4() {
  const [title, setTitle] = useState("");
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // 저장 제출 함수
  async function onSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    // TODO: 소장작성 비동기 통신
    // 모든 조건이 True일 때 제출 가능 (필수입력 공백확인)
    if (accessToken === "") {
      alert("로그인 시 이용 가능합니다! ");
    }
  }

  return (
    <div className={style["container"]}>
      <div className={style["contents-center"]}>
        {/* 상단 저장 버튼 */}
        <div className={style["button-box"]}>
          <Input
            className={style["button"]}
            placeholder="고소장 저장 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
          <Button className={style["button"]} type="primary" onClick={onSubmit}>
            저장하기
          </Button>
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["title"]}>명예훼손 고소장</div>
        <div>
          <p>원고(고소인) 성명: </p>
          <p>주민등록번호: </p>
          <p>주소: </p>
          <p>전화번호:</p>
        </div>
        <div>
          <p>피고(피고소인) 이름:</p>
          <p>주소:</p>
          <p>전화번호:</p>
          <p>기타(피고소인을 특정할 수 있는 증거나 사항):</p>
        </div>
        <div className={style["title"]}>고소취지(목적)( 고정 )</div>
        <div>
          위 사건에 관하여 본 고소인은 아래와 같은 이유로 피고소인을 형법
          제307조의 명예훼손죄로 고소하오니, 수사하여 엄히 처벌하여 주시기
          바랍니다.
        </div>{" "}
        <div className={style["title"]}>청구원인(범죄 사실)</div>
        <div>
          <p>
            1. 고소인은 사건이 발생한 (연원일), (오전 오후 시간), (장소)에
            있었습니다.
          </p>
          <p>
            2. 당시 피고소인은 고소인에게 (명예훼손 행위) 행위로 인한 (허위)사실
            적시 명예훼손을 하였습니다.
          </p>
          <p>
            3. 본 사건이 발생할 당시 (장소)에는 고소인과 피고소인 외에도
            (인원)명이 있었으며, 피고소인은 이들이 지켜보는 가운데 위와 같은
            언행으로써 공연히 고소인의 명예를 훼손하였습니다. 이러한 피고소인의
            행위는 명예훼손죄의 요건인 공연성과 (허위)사실 적시를 충족할 뿐만
            아니라, 고소인을 특정하여 명예훼손한 것이 충분히 인정될 수 있습니다.
            피고소인의 계속된 행위로 고소인은 심한 모멸감을 느꼈고, 이로 인하여
            심각한 신체적/정신적 스트레스를 겪고 있습니다.
          </p>
          <p>
            4. 따라서 피고소인의 위와 같은 행위는 형법 제307조에 정한
            명예훼손죄의 구성요건을 모두 갖추고 있습니다.
          </p>
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["title"]}>고소이유</div>
        <div>
          <p>1. 공연성에 관하여</p>
          <div>
            <p>
              가. 명예훼손죄의 구성요건으로써 공연성은 불특정 또는 다수인이
              인식할 수 있는 상태를 의미합니다. 비록 개별적으로 한 사람에 대하여
              사실을 유포하였더라도 그로부터 불특정 또는 다수인에게 전파될
              가능성이 있다면 공연성의 요건을 충족합니다.
            </p>{" "}
            <p>
              나. 피고소인의 고소인에 대한 명예훼손 행위는 명백히 불특정
              다수에게 전파될 가능성을 내포하고 있다 할 것이므로 공연성 요건
              역시 충족하고 있습니다.
            </p>
          </div>
          <p>2. 비방성에 관하여(명예훼손성)</p>
          <div>
            <p>
              가. 명예훼손죄가 성립하기 위하여는 주관적 구성요소로서 타인의
              명예를 훼손한다는 고의를 가지고 사람의 사회적 평가를 저하시키는데
              충분한 구체적 사실을 적시하는 행위를 할 것이 요구됩니다.
              범죄구성요건의 주관적요소로서 미필적 고의가 필요하므로
              전파가능성에 대한 인식이 있음은 물론 나아가 그 위험을 용인하는
              내심의 의사가 있어야합니다. 행위자가 전파 가능성을 용인하고
              있었는지 여부는 외부에 나타난 행위의 형태와 상황 등 구체적인
              사정을 기초로 일반인이라면 그 전파가능성을 어떻게 평가할 것인가를
              고려하면서 행위자의 입장에서 그 심리상태가 추인된다고
              판시하고있습니다. (대법원 2018. 6. 15. 선고 2018도4200 판결
              [명예훼손] [공2018하,1347])
            </p>{" "}
            <p>
              나. 본 사건에서 피고소인의 발언 및 피고소인이 발언을 한 정황을
              비추어 볼때, 객관적인 사정으로 비추어보아 고소인의 사회적 평가를
              저하시키기 위한 고의적인 의도가 명백히 들어나는 바, 이로 인해
              고소인의 사회적 평가와 명예가 훼손되었기에 명예훼손죄의 구성요건인
              비방성을 충족하고있습니다.
            </p>
          </div>
          <p>3. 특정성에 관하여</p>
          <div>
            <p>
              가. "명예훼손죄와 모욕죄의 보호법익은 사람의 가치에 대한 사회적
              평가인 바 외부적 명예인 점에서는 차이가 없고, 명예의 주체인 사람은
              특정한 자임을 요하지만 반드시 사람의 성명을 명시하여 허위의 사실을
              적시하여야만 하는 것은 아니므로 사람의 성명을 명시한 바 없는
              허위사실의 적시행위도 그 표현의 내용을 주위사정과 종합 판단하여
              그것이 어느 특정인을 지목하는 것인가를 알아차릴 수 있는 경우에는
              그 특정인에 대한 명예훼손죄를 구성한다."는 것이 대법원의 일관된
              입장입니다(대법원 2002. 5. 10. 선고 2000다50213판결 참조).
            </p>{" "}
            <p>
              나. 피고소인이 대면하여 고소인에 대한 신상정보를 명시하는 등
              명예를 훼손한 행위에 비추어 본 사건에서 고소인을 특정하고 있음이
              명백한 바, 피고소인의 명예훼손 행위는 특정성 또한 충족하고
              있습니다.
            </p>
          </div>
          <div className={style["title"]}>결론</div>
          위와 같은 피고소인의 행위는 형법 제307조에 정한 명예훼손죄에 해당하고,
          이로 인한 고소인의 신체적/정신적 피해가 극심하므로, 피고소인을
          수사하여 엄벌에 처해주시기 바랍니다.
        </div>
      </div>
      <div className={style["pages"]}>
        <div className={style["title"]}>첨부서류(증거자료)</div>
        <div>
          <p>- 사건이 촬영된 CCTV 및 영상파일</p>
          <p> - 목격자의 진술서</p>
          <p> - 피고소인의 메신저</p>본 고소장에 기재한 내용은 고소인이 알공
          있는 지식과 경험을 바탕으로 모두 사실대로 작성하였으며, 만일
          허위사실을 고소하였을 때에는 형법 제156조 무고죄로 처벌받을 것임을
          서약합니다.
        </div>
        <div>@@@@년 @@월 @@일</div>
        <div>위 고소인</div>
        <div>(서명 또는 인)</div>
        <div className={style["title"]}> @@@경찰서 @@팀 귀중</div>
      </div>
    </div>
  );
}
