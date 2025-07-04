import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

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
		<Table className='w-[396px] mb-10'>
			<TableCaption className='text-[#6E7491] text-[18px] font-semibold text-left mb-4'>Price grid <span className='text-[#7C8DB0]'>(flexible dates)</span> </TableCaption>
			<TableHeader>
				<TableRow className='border border-[#E9E8FC] '>
					{headElements.map((item, index) => (
						<TableHead
							key={index}
							className='w-[65px]  border-e border-[#E9E8FC] text-center text-xs text-[#52556F] font-bold '
						>
							{item}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody className=' w-full border border-[#E9E8FC] '>
				{bodyElements.map((item) => (
					<TableRow key={item.id}>
						{item.items.map((element, index) => (
							<TableCell
								key={index}
								className={`w-[65px] border-e border-[#E9E8FC] text-center text-xs py-3 ${
									index === 0 ? 'text-[#52556F] font-bold' : 'text-[#6E7491]'
								}  `}
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
