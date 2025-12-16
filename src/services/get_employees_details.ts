import prisma from "../utils/prisma";

async function getEmployeesDetails(name: string) {
  try {
    const userInfo = await prisma.employees.findFirst({
      where: {
        OR: [{ FirstName: name }, { LastName: name }],
      },
    });

    if (!userInfo || userInfo == null) {
      throw new Error("The employee you requested was not found.");
    }

    return userInfo;
  } catch (error) {
    console.error("Error @ getEmployeesDetails:", error);
    throw new Error(`Operation failed: ${JSON.stringify(error)}`);
  } finally {
    await prisma.$disconnect();
  }
}

export default getEmployeesDetails;
