export const toRFC3339BirthDate = (input: any) => {
    if (typeof input !== "string") return input;
    const s = input.trim();
    if (!s) return s;

    if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s;

    const dmY = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const m = s.match(dmY);
    if (m) {
      const day = m[1];
      const month = m[2];
      const year = m[3];
      return `${year}-${month}-${day}T00:00:00Z`;
    }

    const yMd = /^(\d{4})-(\d{2})-(\d{2})$/;
    const m2 = s.match(yMd);
    if (m2) {
      const year = m2[1];
      const month = m2[2];
      const day = m2[3];
      return `${year}-${month}-${day}T00:00:00Z`;
    }

    return s;
}

export const toDottedDate = (input: any) => {
    if (typeof input !== "string") return "";
    const s = input.trim();
    if (!s) return "";

    const mIso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (mIso) {
    const y = mIso[1];
    const mo = mIso[2];
    const d = mIso[3];
    return `${d}.${mo}.${y}`;
    }

    if (/^\d{2}\.\d{2}\.\d{4}$/.test(s)) return s;

    return s;
}
