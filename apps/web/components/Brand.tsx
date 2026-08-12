type BrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export default function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <span className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}${compact ? ' brand-lockup--compact' : ''}`}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__p">P</span>
        <span className="brand-mark__s">S</span>
      </span>
      {!compact && (
        <span className="brand-copy">
          <strong>Perrucci</strong>
          <span>Solutions</span>
        </span>
      )}
    </span>
  );
}
