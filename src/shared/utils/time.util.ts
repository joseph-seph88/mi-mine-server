export class TimeUtil {
    /**
     * 문자열 형태의 시간을 초 단위로 변환
     * @param timeString - 예: "30m", "1h", "7d", "900s"
     * @returns 초 단위 시간 (기본값: 900초)
     */
    static parseToSeconds(timeString: string): number {
        const match = timeString.match(/^(\d+)([smhd])$/);
        if (!match) return 900;

        const value = parseInt(match[1]);
        const unit = match[2];

        switch (unit) {
            case 's': return value;
            case 'm': return value * 60;
            case 'h': return value * 60 * 60;
            case 'd': return value * 24 * 60 * 60;
            default: return 900;
        }
    }

    /**
     * 초 단위 시간을 문자열로 변환
     * @param seconds - 초 단위 시간
     * @returns 문자열 형태 시간 (예: "30m", "1h")
     */
    static formatFromSeconds(seconds: number): string {
        if (seconds < 60) return `${seconds}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
        return `${Math.floor(seconds / 86400)}d`;
    }

    /**
     * 현재 시간으로부터 만료 시간 계산
     * @param timeString - 예: "30m", "1h", "7d"
     * @returns 만료 시간 (Date 객체)
     */
    static getExpirationDate(timeString: string): Date {
        const seconds = this.parseToSeconds(timeString);
        return new Date(Date.now() + seconds * 1000);
    }
}
