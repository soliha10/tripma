'use client';

import clsx from 'clsx';

const EXIT_ROWS = [6, 14, 19, 29];

const BUSINESS_COLS = ['A', 'B', 'C', 'D'];
const ECONOMY_COLS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function SeatMap({
  selectedSeat,
  setSelectedSeat,
  section,
  onBusinessSelect,
}: {
  selectedSeat: { row: number; col: string } | null;
  setSelectedSeat: (seat: { row: number; col: string } | null) => void;
  section: 'depart' | 'return';
  onBusinessSelect?: () => void;
}) {
  const allRows = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center py-6 px-2 gap-1 absolute left-[320px] top-[260px]">
      {/* Business Class */}
      <div className="bg-white p-2 rounded">
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
                onBusinessSelect?.(); // faqat business joy tanlansa ochiladi
              }}
            />
          ))}
      </div>

      <div className="h-2" />

      {/* Economy Class */}
      <div className="bg-white p-2 rounded">
        {allRows
          .filter((r) => r > 5)
          .map((row) => (
            <div key={`${section}-economy-${row}`} className="flex flex-col items-center">
              {EXIT_ROWS.includes(row) && (
                <span className="text-[10px] italic text-[#7C8DB0] mb-1">Exit row</span>
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
  selectedSeat: { row: number; col: string } | null;
  onSelect: (seat: { row: number; col: string }) => void;
}) {
  const left = cols.slice(0, cols.length / 2);
  const right = cols.slice(cols.length / 2);

  const seatGap = type === 'business' ? 'gap-1' : 'gap-1'; // 4px
  const seatSize = type === 'economy' ? 'w-3 h-5 mb-1 rounded' : 'w-5 h-6 rounded mb-1 ';

  return (
    <div className={`relative flex items-center justify-center ${seatGap}`}>
      {/* Left seats */}
      <div className={`flex ${seatGap}`}>
        {left.map((col) => {
          const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
          return (
            <button
              key={`${row}${col}`}
              onClick={() => onSelect({ row, col })}
              className={clsx('transition-all duration-150', seatSize, {
                'bg-[#5CD6C0]': type === 'business' && !isSelected,
                'bg-[#605DEC]': type === 'economy' && !isSelected,
                'bg-[#E86A6A]': isSelected,
              })}
              aria-label={`Seat ${row}${col}`}
            />
          );
        })}
      </div>

      {/* Center row label */}
      <span className="text-xs text-[#6E7491] w-6 text-center">{row}</span>

      {/* Right seats */}
      <div className={`flex ${seatGap}`}>
        {right.map((col) => {
          const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
          return (
            <button
              key={`${row}${col}`}
              onClick={() => onSelect({ row, col })}
              className={clsx('transition-all duration-150', seatSize, {
                'bg-[#5CD6C0]': type === 'business' && !isSelected,
                'bg-[#605DEC]': type === 'economy' && !isSelected,
                'bg-[#E86A6A]': isSelected,
              })}
              aria-label={`Seat ${row}${col}`}
            />
          );
        })}
      </div>
    </div>
  );
}
