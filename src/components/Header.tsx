interface HeaderProps {
  isMobile: boolean;
}

export default function Header({ isMobile }: HeaderProps) {
  if (isMobile) {
    return (
      <div style={{ width: "10%", textAlign: "center", position: "relative", zIndex: 9999 }}>
        <img src="/logo_party_hd-removebg-preview.png" alt="Logo" style={{ maxWidth: "100px", marginTop: "-12px" }} />
      </div>
    );
  }

  return (
    <>
      <div style={{ width: "100%", height: "2px", backgroundColor: "#F363FA", position: "fixed", top: 0, left: 0, zIndex: 10000 }}></div>
      <div style={{ width: "10%", textAlign: "left", marginLeft: "25px", marginBottom: "30px", position: "relative", zIndex: 9999 }}>
        <img src="/logo_party_hd-removebg-preview.png" alt="Logo" style={{ maxWidth: "200px", marginTop: "-12px" }} />
      </div>
    </>
  );
}
