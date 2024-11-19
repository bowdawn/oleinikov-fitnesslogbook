export const getFilteredAndSortedRecords = (
    data: ({
        id: string;
        name: string;
      } | null)[] | null | undefined,
    currentInput: string
  ): {
    value: string;
  }[] => {
    const normalizedInput = currentInput.toLowerCase();
    console.log("filter and sort")
    return (
      data?.filter(
        (record): record is {
    
            id: string;
            name: string;
          }  =>
          record !== null && typeof record.name === "string" && record.name.trim().length > 0
      )
      .reduce((acc, record) => {
        const exerciseName = record.name.toLowerCase(); 
        const score = exerciseName.indexOf(normalizedInput);
        if (score !== -1) {
          acc.push({ record, score });
        }
        return acc;
      }, [] as { record: {
        id: string;
        name: string;
      }; score: number }[])
      .sort((a, b) => a.score - b.score || a.record.name.localeCompare(b.record.name))
      .map(({ record }) => ({ value: record.name })) || []
    );
  };
  