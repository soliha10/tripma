'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import styles from './css/Price.module.css';

export default function Price() {
  const headElements = ['', '2/12', '2/13', '2/14', '2/15', '2/16'];
  const bodyElements = [
    {
      id: 1,
      items: ['3/7', '$837', '$592', '$592', '$1,308', '$837'],
    },
    {
      id: 2,
      items: ['3/8', '$837', '$592', '$592', '$1,308', '$837'],
    },
    {
      id: 3,
      items: ['3/9', '$837', '$592', '$592', '$1,308', '$837'],
    },
    {
      id: 4,
      items: ['3/10', '$837', '$592', '$592', '$1,308', '$837'],
    },
    {
      id: 5,
      items: ['3/11', '$837', '$592', '$592', '$1,308', '$837'],
    },
  ];

  return (
    <Table className={styles.tableWrapper}>
      <TableCaption className={styles.caption}>
        Price grid <span className={styles.captionHighlight}>(flexible dates)</span>
      </TableCaption>
      <TableHeader>
        <TableRow className={styles.headerRow}>
          {headElements.map((item, index) => (
            <TableHead key={index} className={styles.headCell}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={styles.body}>
        {bodyElements.map((item) => (
          <TableRow key={item.id} className={styles.bodyRow}>
            {item.items.map((element, index) => (
              <TableCell
                key={index}
                className={`${styles.bodyCell} ${index === 0 ? styles.bodyCellFirst : ''}`}
              >
                {element}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
