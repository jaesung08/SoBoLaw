package com.sobolaw.api.member.entity;

import static jakarta.persistence.FetchType.LAZY;

import com.sobolaw.api.member.entity.Type.HighlightType;
import com.sobolaw.global.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

/**
 * 멤버 최근 본 판례.                         `
 */
@SQLRestriction("is_deleted = false")
@Table(name = "member_precedent_highlight")
@Getter
@Entity
public class MemberPrecedentHighlight extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberPrecedentHighlightId;

    @Setter
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_precedent_id", nullable = false)
    private MemberPrecedent memberPrecedent;

    @Setter
    @Column(nullable = false, length = 3000)
    private String main;

    @Setter
    @Column(nullable = false)
    private Long startPoint;

    @Setter
    @Column(nullable = false)
    private Long endPoint;

    @Setter
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private HighlightType highlightType;

    @Setter
    @Column
    private String content;

    protected MemberPrecedentHighlight() {
    }

    /**
     * 멤버 저장 판례의 하이라이트 파라미터 생성자.
     */
    private MemberPrecedentHighlight(String main, Long startPoint, Long endPoint, HighlightType highlightType, String content) {
        this.main = main;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.highlightType = highlightType;
        this.content = content;
    }

    /**
     * 파라미터로 멤버 저장 판례의 하이라이트 엔티티 객체 생성하는 함수.
     */
    public static MemberPrecedentHighlight of(String main, Long startPoint, Long endPoint, HighlightType highlightType, String content) {
        return new MemberPrecedentHighlight(main, startPoint, endPoint, highlightType, content);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberPrecedentHighlight memberRecent)) {
            return false;
        }
        return memberPrecedentHighlightId != null && memberPrecedentHighlightId.equals(memberRecent.getMemberPrecedentHighlightId());
    }
}
