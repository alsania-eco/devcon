import { XMarkIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import { CloseButton, defaultBorderRadius, vscInputBackground } from ".";

const StyledCard = styled.div`
  margin: auto;
  border-radius: ${defaultBorderRadius};
  background: rgba(0, 31, 63, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(57, 255, 20, 0.15);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(57, 255, 20, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

interface ReusableCardProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  testId?: string;
}

export function ReusableCard({
  children,
  showCloseButton,
  onClose,
  className = "",
  testId,
}: ReusableCardProps) {
  return (
    <StyledCard
      className={`xs:py-4 xs:px-4 relative px-2 py-3 ${className}`}
      data-testid={testId}
    >
      {showCloseButton && (
        <CloseButton onClick={onClose}>
          <XMarkIcon className="flex h-5 w-5 hover:brightness-125" />
        </CloseButton>
      )}
      <div className="content py-2">{children}</div>
    </StyledCard>
  );
}
