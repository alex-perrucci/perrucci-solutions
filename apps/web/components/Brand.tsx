type BrandProps = {
  inverse?: boolean;
  compact?: boolean;
};

export default function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <span className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}${compact ? ' brand-lockup--compact' : ''}`}>
      <img
        className="brand-artwork"
        src={compact
          ? (inverse ? '/identity/svg/symbol-on-dark.svg' : '/identity/svg/symbol-ink.svg')
          : (inverse ? '/identity/svg/primary-dark.svg' : '/identity/svg/primary-light.svg')}
        alt=""
        width={compact ? 48 : 212}
        height={compact ? 48 : 40}
        aria-hidden="true"
      />
    </span>
  );
}
