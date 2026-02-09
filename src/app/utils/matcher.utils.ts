export function calculateMatch(
  jobSkills: number[],
  employeeSkills: number[]
): number {
  const matches = jobSkills.filter(s =>
    employeeSkills.includes(s)
  );
  return Math.round((matches.length / jobSkills.length) * 100);
}
