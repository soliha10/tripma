'use client';

import styles from './css/SeatMap.module.css';
import clsx from 'clsx';
import info from '@/app/[locale]/assets/images/information.svg';
import Image from 'next/image';
const EXIT_ROWS = [6, 14, 19, 29];
const BUSINESS_COLS = ['A', 'B', 'C', 'D'];
const ECONOMY_COLS = ['A', 'B', 'C', 'D', 'E', 'F'];

type Seat = { row: number; col: string };
type Props = {
  selectedSeat: Seat | null;
  setSelectedSeat: (seat: Seat | null) => void;
  section: 'depart' | 'return';
  onBusinessSelect?: () => void;
};

export default function SeatMap({
  selectedSeat,
  setSelectedSeat,
  section,
  onBusinessSelect,
}: Props) {
  const allRows = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {/* Business Class */}
      <div className={styles.sectionBox}>
        <h3 className={styles.sectionTitle}>Business Class</h3>
        {allRows
          .filter((r) => r <= 5)
          .map((row) => (
            <SeatRow
              key={`${section}-business-${row}`}
              row={row}
              cols={BUSINESS_COLS}
              type="business"
              selectedSeat={selectedSeat}
              onSelect={(seat) => {
                setSelectedSeat(seat);
                onBusinessSelect?.();
              }}
            />
          ))}
      </div>

      <div className={styles.sectionSpacer} />

      {/* Economy Class */}
      <div className={styles.sectionBox}>
        <h3 className={styles.sectionTitle}>Economy Class</h3>
        {allRows
          .filter((r) => r > 5)
          .map((row) => (
            <div key={`${section}-economy-${row}`} className={styles.economyRowWrapper}>
              {EXIT_ROWS.includes(row) && (
                <span className={styles.exitText}>
                  <Image
                    src={info}
                    alt="Exit row information"
                    className={styles.info}
                    width={18}
                    height={18}
                  />
                  Exit row
                </span>
              )}
              <SeatRow
                row={row}
                cols={ECONOMY_COLS}
                type="economy"
                selectedSeat={selectedSeat}
                onSelect={setSelectedSeat}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

function SeatRow({
  row,
  cols,
  type,
  selectedSeat,
  onSelect,
}: {
  row: number;
  cols: string[];
  type: 'business' | 'economy';
  selectedSeat: Seat | null;
  onSelect: (seat: Seat) => void;
}) {
  const left = cols.slice(0, cols.length / 2);
  const right = cols.slice(cols.length / 2);

  return (
    <div className={styles.seatRow}>
      {/* Left seats */}
      <div className={styles.seatCol}>
        {left.map((col) => {
          const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
          return (
            <button
              key={`${row}${col}`}
              onClick={() => onSelect({ row, col })}
              className={clsx(
                styles.seatBase,
                type === 'business' && styles.business,
                type === 'economy' && styles.economy,
                isSelected && styles.selected,
              )}
              aria-label={`Select seat ${row}${col} in ${type} class`}
            />
          );
        })}
      </div>

      {/* Row label */}
      <span className={styles.rowLabel}>{row}</span>

      {/* Right seats */}
      <div className={styles.seatCol}>
        {right.map((col) => {
          const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
          return (
            <button
              key={`${row}${col}`}
              onClick={() => onSelect({ row, col })}
              className={clsx(
                styles.seatBase,
                type === 'business' && styles.business,
                type === 'economy' && styles.economy,
                isSelected && styles.selected,
              )}
              aria-label={`Select seat ${row}${col} in ${type} class`}
            />
          );
        })}
      </div>
    </div>
  );
}
